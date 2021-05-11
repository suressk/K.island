FROM node:alpine

RUN mkdir -p /web

COPY . /web

WORKDIR /web

RUN cnpm install

RUN cnpm run build

ENV HOST 0.0.0.0
ENV PORT 8108

EXPOSE 8108

CMD ["npm", "run", "start"]
