FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# devDependencies 포함 전체 설치 (ts-node 사용 위함)
RUN apk add --no-cache openssl
RUN npm install

# 전체 소스 복사
COPY . .

# Prisma Client 생성
RUN npx prisma generate

EXPOSE 5010
ENV PORT=5010
CMD ["npm", "start"]
