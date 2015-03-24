# drp系统说明

## 功能简介
DRP系统主要由库存管理、质量控制、运输管理、采购管理、计划/调度管理、订单管理、数据库接口与数据传输模块组成。

## 技术选型

SpringMVC+Hibernate4+ExtJS4.1

## 运行说明

1. 具备运行环境：JDK1.7、Maven3.0、MySql5
2. 添加文件filters/dev/jdbc.properties，并写入自己的本地化配置，可参考filters/prod/jdbc.properties
3. 根据修改参数创建对应MySql数据库（数据库编码：UTF-8）
4. 执行mvn tomcat7:run，自动创建对应的数据库
5. 导入src/main/resources/sql/users.sql，初始化管理员记录，默认为username:admin，password:admin 

## 如何交流、反馈、参与贡献？

* QQ群：384253170(诚邀各位盟友加入)

如果你想参与进来共同完善它或有更好的建议，请联系我吧(^_^)。

## 版权声明

本软件使用 [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0) 协议，请严格遵照协议内容：

1. 需要给代码的用户一份Apache Licence。
2. 如果你修改了代码，需要在被修改的文件中说明。
3. **在延伸的代码中（修改和有源代码衍生的代码中）需要带有原来代码中的协议，商标，专利声明和其他原来作者规定需要包含的说明。**
4. 如果再发布的产品中包含一个Notice文件，则在Notice文件中需要带有Apache Licence。你可以在Notice中增加自己的许可，但不可以表现为对Apache Licence构成更改。
3. Apache Licence也是对商业应用友好的许可。使用者也可以在需要的时候修改代码来满足需要并作为开源或商业产品发布/销售