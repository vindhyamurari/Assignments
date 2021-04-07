const path=require('path');

module.exports={
    entry : './public/BookApp.js',
    output:{
        filename:'bundle.js',
        path : path.resolve(__dirname,'dist')
    },
    mode: 'development',
    module:{
        rules : [{test: /\.scss$/ , use: ['style-loader','css-loader','sass-loader' ] }],
    },
};