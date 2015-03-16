package com.originspark.drp.util.json;


public class PasswordJson {

        private String pwd;
        private String newpwd;
        private String newpwdagain;
        
        public PasswordJson() {
            super();
        }
        public String getPwd() {
            return pwd;
        }
        public void setPwd(String pwd) {
            this.pwd = pwd;
        }
        public String getNewpwd() {
            return newpwd;
        }
        public void setNewpwd(String newpwd) {
            this.newpwd = newpwd;
        }
        public String getNewpwdagain() {
            return newpwdagain;
        }
        public void setNewpwdagain(String newpwdagain) {
            this.newpwdagain = newpwdagain;
        }
        
        
    }