package com.originspark.drp.controllers.resources;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.originspark.drp.controllers.BaseController;
import com.originspark.drp.models.User;
import com.originspark.drp.models.resources.WareCategory;
import com.originspark.drp.util.enums.Status;
import com.originspark.drp.web.models.resources.WareCategoryForm;

@Controller
@RequestMapping("wares/categories")
public class WareCategoryController extends BaseController {

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String list() {
        List<WareCategory> data = wareCategoryService.treeViewData();
        return ok(data);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody WareCategoryForm categoryForm) {

        if(StringUtils.isEmpty(categoryForm.getName())) {
            return failure("分类名称不能为空");
        }

        WareCategory category = new WareCategory();
        category.setName(categoryForm.getName());
        category.setCode(categoryForm.getCode());
        wareCategoryService.save(category);

        return ok("创建成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody WareCategoryForm form) {

        WareCategory existingCategory = wareCategoryService.findById(WareCategory.class, id);
        if (existingCategory == null) {
            return failure("您要更新的分类不存在");
        }

        existingCategory.setName(form.getName());
        existingCategory.setCode(form.getCode());
        wareCategoryService.update(existingCategory);

        return ok("更新成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable Long id) {

        WareCategory existingCategory = wareCategoryService.findById(WareCategory.class, id);
        if (existingCategory == null) {
            return failure("您要删除的分类不存在");
        }
        existingCategory.setStatus(Status.DESTORYED);
        wareCategoryService.update(existingCategory);

        return ok("删除成功");
    }
}
