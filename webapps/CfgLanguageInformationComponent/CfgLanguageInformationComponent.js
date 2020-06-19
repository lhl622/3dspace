define("DS/CfgLanguageInformationComponent/Model/CfgLanguageInformationItemModel",["UWA/Class/Model"],function(b){var a=b.extend({title:null,description:null,elements:[]});return a});define("DS/CfgLanguageInformationComponent/Model/CfgLanguageInformationModelXModel",["i18n!DS/CfgLanguageInformationComponent/assets/nls/CfgLanguageInformationComponent"],function(a){var b=[{title:"criteria_title",description:"",elements:["<span>"+a.criteria_variant+" / "+a.criteria_value+" : </span>","<br>",'<span class="spanitalic">'+a.criteria_variantvalue_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample1+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant1Sample+"</span></span>","<br>","<br>","<span>"+a.criteria_variant+" / "+a.criteria_values+" : </span>","<br>",'<span class="spanitalic">'+a.criteria_variantvalues_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample1+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant1Sample+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant1Sample2+"</span></span>","<br>","<br>","<span>"+a.criteria_variant+" : </span>","<br>",'<span class="spanitalic">'+a.criteria_variant_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample1+"</span></span>","<br>","<br>","<span>"+a.criteria_option+" : </span>","<br>",'<span class="spanitalic">'+a.option_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_OptionSample+"</span></span>","<br>","<br>"]},{title:"standard_operators_title",description:"",elements:["<span>"+a.standard_operators_not+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_not+"</span></span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<br>",'<span class="spanitalic">'+a.not_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_not+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample1+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant1Sample+"</span></span>","<br>","<br>","<span>"+a.standard_operators_and+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_and+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>",'<span class="spanitalic">'+a.and_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample1+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant1Sample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_and+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant2Sample1+"</span></span>","<br>","<br>","<span>"+a.standard_operators_or+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_or+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>",'<span class="spanitalic">'+a.or_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant2Sample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_or+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample4+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant3Sample4+"</span></span>","<br>","<br>","<span>"+a.standard_operators_parenthesis+" : </span>",'<span class="badge badge-default"><span class="badge-content">(</span></span>',"<span>&nbsp;"+a.expression1+"&nbsp;</span>",'<span class="badge badge-default"><span class="badge-content">)</span></span>',"<br>",'<span class="spanitalic">'+a.parenthesis_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">(</span></span>','<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample1+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant1Sample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_or+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant2Sample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">)</span></span>','<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_and+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample3+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant3Sample1+"</span></span>"]},{title:"conditional_requirement_title",description:"",elements:["<span>"+a.conditional_requirement_imply+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>",'<span class="badge badge-default"><span class="badge-content">'+a.conditional_requirement_imply+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>",'<span class="spanitalic">'+a.imply_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant2Sample1+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.conditional_requirement_imply+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample4+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant3Sample4+"</span></span>"]},{title:"co_dependency_title",description:"",elements:["<span>"+a.co_dependency_equivalent+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>",'<span class="badge badge-default"><span class="badge-content">'+a.co_dependency_equivalent+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>",'<span class="spanitalic">'+a.equivalent_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample3+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant3Sample1+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.co_dependency_equivalent+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample4+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant3Sample4+"</span></span>"]},{title:"incompatibility_title",description:"",elements:['<span class="spanitalic">'+a.incompatibility_explanation+"</span>","<br>",'<span class="spanitalic">'+a.example+" : </span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant2Sample2+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.conditional_requirement_imply+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.standard_operators_not+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_VariantClassSample4+"</span></span>",'<span class="badge badge-default"><span class="badge-content">'+a.sample_Variant3Sample4+"</span></span>"]}];return b});define("DS/CfgLanguageInformationComponent/Model/CfgLanguageInformationModelXPortfolio",["i18n!DS/CfgLanguageInformationComponent/assets/nls/CfgLanguageInformationComponent"],function(a){var b=[{title:"criteria_title",description:"",elements:["<span>"+a.criteria_variantClass+" / "+a.criteria_variant+" : </span>","<br>","<span class='spanitalic'>"+a.criteria_variantclassvariant_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample+"</span></span>","<br>","<br>","<span>"+a.criteria_variantClass+" / "+a.criteria_variants+" : </span>","<br>","<span class='spanitalic'>"+a.criteria_variantclassvariants_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample2+"</span></span>","<br>","<br>","<span>"+a.criteria_variantClass+" : </span>","<br>","<span class='spanitalic'>"+a.criteria_variantClass_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<br>","<br>","<span>"+a.criteria_option+" : </span>","<br>","<span class='spanitalic'>"+a.option_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_OptionSample+"</span></span>","<br>","<br>","<span>"+a.criteria_Pack+" : </span>","<br>","<span class='spanitalic'>"+a.pack_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_PackSample+"</span></span>"]},{title:"standard_operators_title",description:"",elements:["<span>"+a.standard_operators_not+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_not+"</span></span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.not_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_not+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample+"</span></span>","<br>","<br>","<span>"+a.standard_operators_and+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_and+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.and_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_and+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample1+"</span></span>","<br>","<br>","<span>"+a.standard_operators_or+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_or+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.or_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_or+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>","<br>","<br>","<span>"+a.standard_operators_parenthesis+" : </span>","<span class='badge badge-default'><span class='badge-content'>(</span></span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>)</span></span>","<br>","<span class='spanitalic'>"+a.parenthesis_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>(</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_or+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>)</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_and+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample3+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample1+"</span></span>"]},{title:"conditional_requirement_title",description:"",elements:["<span>"+a.conditional_requirement_imply+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.conditional_requirement_imply+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.imply_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.conditional_requirement_imply+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>"]},{title:"co_dependency_title",description:"",elements:["<span>"+a.co_dependency_equivalent+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.co_dependency_equivalent+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.equivalent_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample3+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.co_dependency_equivalent+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>"]},{title:"incompatibility_title",description:"",elements:["<span class='spanitalic'>"+a.incompatibility_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.conditional_requirement_imply+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_not+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>"]}];return b});define("DS/CfgLanguageInformationComponent/Model/CfgLanguageInformationModelFTR",["i18n!DS/CfgLanguageInformationComponent/assets/nls/CfgLanguageInformationComponent"],function(a){var b=[{title:"criteria_title",description:"",elements:["<span>"+a.criteria_Feature+" / "+a.criteria_option+" : </span>","<br>","<span class='spanitalic'>"+a.criteria_featureoption_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample+"</span></span>","<br>","<br>","<span>"+a.criteria_Feature+" / "+a.criteria_severalOptions+" : </span>","<br>","<span class='spanitalic'>"+a.criteria_severalOptions_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample2+"</span></span>","<br>","<br>","<span>"+a.criteria_Feature+" : </span>","<br>","<span class='spanitalic'>"+a.criteria_feature_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>"]},{title:"standard_operators_title",description:"",elements:["<span>"+a.standard_operators_not+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_not+"</span></span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.not_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_not+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample+"</span></span>","<br>","<br>","<span>"+a.standard_operators_and+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_and+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.and_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_and+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample1+"</span></span>","<br>","<br>","<span>"+a.standard_operators_or+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_or+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.or_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_or+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>","<br>","<br>","<span>"+a.standard_operators_parenthesis+" : </span>","<span class='badge badge-default'><span class='badge-content'>(</span></span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>)</span></span>","<br>","<span class='spanitalic'>"+a.parenthesis_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>(</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant1Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_or+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>)</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_and+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample3+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample1+"</span></span>"]},{title:"conditional_requirement_title",description:"",elements:["<span>"+a.conditional_requirement_imply+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.conditional_requirement_imply+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.imply_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.conditional_requirement_imply+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>"]},{title:"co_dependency_title",description:"",elements:["<span>"+a.co_dependency_equivalent+" : </span>","<span>&nbsp;"+a.expression1+"&nbsp;</span>","<span class='badge badge-default'><span class='badge-content'>"+a.co_dependency_equivalent+"</span></span>","<span>&nbsp;"+a.expression2+"&nbsp;</span>","<br>","<span class='spanitalic'>"+a.equivalent_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample3+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample1+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.co_dependency_equivalent+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>"]},{title:"incompatibility_title",description:"",elements:["<span class='spanitalic'>"+a.incompatibility_explanation+"</span>","<br>","<span class='spanitalic'>"+a.example+" : </span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant2Sample2+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.conditional_requirement_imply+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.standard_operators_not+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_VariantClassSample4+"</span></span>","<span class='badge badge-default'><span class='badge-content'>"+a.sample_Variant3Sample4+"</span></span>"]}];return b});define("DS/CfgLanguageInformationComponent/Model/CfgLanguageInformationModel",["UWA/Class/Collection","DS/CfgLanguageInformationComponent/Model/CfgLanguageInformationItemModel"],function(c,a){var b=UWA.Class.Collection.extend({model:a});return b});define("DS/CfgLanguageInformationComponent/Presenter/CfgLanguageInformationPresenter",["DS/W3DXComponents/Views/Temp/TempItemView","DS/UIKIT/Accordion","DS/CfgLanguageInformationComponent/Model/CfgLanguageInformationModel","i18n!DS/CfgLanguageInformationComponent/assets/nls/CfgLanguageInformationComponent","text!DS/CfgLanguageInformationComponent/View/CfgLanguageInformationTemplate.html","css!DS/CfgLanguageInformationComponent/View/CfgLanguageInformation.css","css!DS/UIKIT/UIKIT.css"],function(g,a,f,e,b,c,h){var d=g.extend({name:"language-information-view",tagName:"div",template:function(){return b},setup:function(t){var s=this;s._isOpen=false;var q=(t._givenModel)?t._givenModel:[];s._title=e.languageInformation_title;s._localModelEvent=t._localModelEvent;s.collection=new f(q);s.container.addClassName(this.getClassNames("-container"));var k={};k.className="filled";k.arrows=false;k.items=[];k.events={};k.events.onChange=function(j,i){};var p=0,o=0;for(p=0;p<s.collection.length;p+=1){var r="";if(s.collection.at(p).get("description")!==""){r+=e[s.collection.at(p).get("description")]+"<br>"}for(o=0;o<s.collection.at(p).get("elements").length;o+=1){r+=s.collection.at(p).get("elements")[o]}k.items.push({title:e[s.collection.at(p).get("title")],content:r})}var m={};m.className="filled";m.arrows=false;m.items=[];var n='<span class="fonticon fonticon-info"></span>'+s._title;m.items.push({title:n,content:" ",accordion:k});m.events={};var l=true;m.events.onChange=function(j,i){if(j.isSelected&&j.accordionId===m.items[0].accordionId){s._isOpen=true;s._localModelEvent.publish({event:"onResizeLIP",data:true})}else{if(j.accordionId===m.items[0].accordionId){s._isOpen=false;s._localModelEvent.publish({event:"onResizeLIP",data:false})}}};s._accordion=new a(m)},onRender:function(){var i=this;i._accordion.inject(i.container.getElement(".content-section"))}});return d});