#!/bin/bash
handlebars ../render/*/*/*.hbs -f precompiled.js 2>/dev/null || handlebars ./render/*/*/*.hbs -f ./handlebars/precompiled.js 2>/dev/null
if [ $? ]
then
    echo precompile successfully ended
else
    echo bad precompile
fi
