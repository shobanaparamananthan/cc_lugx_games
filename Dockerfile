FROM public.ecr.aws/docker/library/node:18
# Install netcat (correct package for Debian/Ubuntu)
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x wait-for-it.sh

EXPOSE 8000

CMD ["./wait-for-it.sh", "mysql:3306", "--", "node", "app.js"]
