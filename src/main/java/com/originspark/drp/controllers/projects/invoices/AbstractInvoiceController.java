package com.originspark.drp.controllers.projects.invoices;

import com.originspark.drp.controllers.AbstractController;
import com.originspark.drp.models.projects.invoices.AbstractInvoice;
import com.originspark.drp.util.enums.AuditState;

public class AbstractInvoiceController extends AbstractController {

    protected void updateState(AbstractInvoice invoice,String userType,AuditState state) {
        
        if(invoice.getPass() == true){
            return;
        }

        if (userType.equals("MaterialKeeper")) {
            invoice.setMaterialKeeperAuditState(state);
            invoice.setWareKeeperAuditState(AuditState.UNAUDITED);
            invoice.setProjectManagerAuditState(AuditState.UNAUDITED);
        } else if (userType.equals("WareKeeper")) {
            if (invoice.getMaterialKeeperAuditState() == AuditState.APPROVED) {
                invoice.setWareKeeperAuditState(state);
                if(state == AuditState.UNAPPROVED){
                    invoice.setMaterialKeeperAuditState(state);
                }
            }
        }else if (userType.equals("ProjectManager")) {
            if (invoice.getMaterialKeeperAuditState() == AuditState.APPROVED &&
                    invoice.getWareKeeperAuditState() == AuditState.APPROVED) {
                invoice.setProjectManagerAuditState(state);
                if(state == AuditState.UNAPPROVED){
                    invoice.setMaterialKeeperAuditState(state);
                }else{
                    invoice.setPass(true);
                }
            }
        }

    }

}
