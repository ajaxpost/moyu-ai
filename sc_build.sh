rm -rf .next
rm -rf _moyu_

nvm use 20

if ! yarn build; then
    echo "yarn build failed. Exiting..."
    exit 1
fi

if [ -d .next ]; then
    echo "执行迁移操作。。。。"
    
    mkdir -p _moyu_/data

    # -r: 递归复制目录及其所有子目录和文件
    cp -r ./public _moyu_/public

    cp -r ./.next _moyu_/.next

    cp ./Dockerfile2 _moyu_/Dockerfile
else
    echo "不存在 .next 目录"
    exit 1
fi


