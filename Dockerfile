FROM node:18.20.3-bullseye AS base

FROM base AS deps

WORKDIR /app

COPY package.json .npmrc ./

# RUN \ 这个反斜杠是为了续行,在下一行继续
# 如果存在 package.json 就执行 npm install
RUN \
    if [ -f package.json ]; then pnpm install; \
    fi

# 打包阶段
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
    if [ -f package.json ]; then pnpm run build; \
    fi

# 运行阶段
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/server.mjs ./backed

RUN mkdir -p ./backed/data


# 暴露端口
EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js", "node", "./backed/server.mjs"]