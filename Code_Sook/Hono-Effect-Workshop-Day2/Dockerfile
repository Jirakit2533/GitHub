ARG NODE_VERSION=22
ARG PNPM_VERSION=9.4.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}

FROM base AS build

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

COPY . .

RUN pnpm run prisma:generate && pnpm run build

FROM build AS deps

RUN pnpm prune --prod

FROM base AS final
WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

WORKDIR /app/dist/src
EXPOSE 3000
CMD ["index.js"]
