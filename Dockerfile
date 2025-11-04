FROM node:22-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

# Tạo thư mục làm việc
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

# Copy file vào container
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env ./.env
RUN cat ./.env

RUN yarn build

FROM base AS runner 
WORKDIR /app

ENV NODE_ENV=production

# Tạo nhóm và người dùng
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs


RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app ./

USER nextjs

# Mở port
EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

# Lệnh chạy app
CMD ["yarn", "start"]
