
const CracoLessPlugin = require('craco-less');
 
module.exports = {
    babel: {//支持装饰器
        plugins: [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true //设置为true即是less 用css写'css'
                }
            ]
        ],
    },

    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#119579', // 全局主色
                        },
                        javascriptEnabled: true,
                    },
                }
            },
        },
    ],
};