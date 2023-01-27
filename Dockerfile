# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:16 as base
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY ./lerna.json ./
COPY ./.yarnrc ./
# Package @automatisch/docs
FROM base as automatisch_docs-build
WORKDIR /app/packages/docs
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/docs/package-slim.json package.json
WORKDIR /app/
RUN npx lerna bootstrap --scope=@automatisch/docs --includeDependencies
WORKDIR /app/packages/docs
# The normal package.json should be copied after the install into the container
COPY  packages/docs/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
RUN yarn run build
# Package @automatisch/e2e-tests
FROM base as automatisch_e2e-tests-build
WORKDIR /app/packages/e2e-tests
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/e2e-tests/package-slim.json package.json
WORKDIR /app/
RUN npx lerna bootstrap --scope=@automatisch/e2e-tests --includeDependencies
WORKDIR /app/packages/e2e-tests
# The normal package.json should be copied after the install into the container
COPY  packages/e2e-tests/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
# Package @automatisch/types
FROM base as automatisch_types-build
WORKDIR /app/packages/types
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/types/package-slim.json package.json
WORKDIR /app/
RUN npx lerna bootstrap --scope=@automatisch/types --includeDependencies
WORKDIR /app/packages/types
# The normal package.json should be copied after the install into the container
COPY  packages/types/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
# Package @automatisch/web
FROM base as automatisch_web-build
WORKDIR /app/packages/web
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/web/package-slim.json package.json
WORKDIR /app/
COPY --from=automatisch_types-build /app/packages/types/package.json /app/packages/types/
RUN npx lerna bootstrap --scope=@automatisch/web --includeDependencies
COPY --from=automatisch_types-build /app/packages/types/ /app/packages/types/
WORKDIR /app/packages/web
# The normal package.json should be copied after the install into the container
COPY  packages/web/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
RUN yarn run build
# Package @automatisch/backend
FROM base as automatisch_backend-build
WORKDIR /app/packages/backend
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/backend/package-slim.json package.json
WORKDIR /app/
COPY --from=automatisch_types-build /app/packages/types/package.json /app/packages/types/
COPY --from=automatisch_web-build /app/packages/web/package.json /app/packages/web/
RUN npx lerna bootstrap --scope=@automatisch/backend --includeDependencies
COPY --from=automatisch_types-build /app/packages/types/ /app/packages/types/
COPY --from=automatisch_web-build /app/packages/web/ /app/packages/web/
WORKDIR /app/packages/backend
# The normal package.json should be copied after the install into the container
COPY  packages/backend/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
RUN yarn run build
# Package @automatisch/cli
FROM base as automatisch_cli-build
WORKDIR /app/packages/cli
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/cli/package-slim.json package.json
WORKDIR /app/
COPY --from=automatisch_backend-build /app/packages/backend/package.json /app/packages/backend/
COPY --from=automatisch_types-build /app/packages/types/package.json /app/packages/types/
COPY --from=automatisch_web-build /app/packages/web/package.json /app/packages/web/
RUN npx lerna bootstrap --scope=@automatisch/cli --includeDependencies
COPY --from=automatisch_backend-build /app/packages/backend/ /app/packages/backend/
COPY --from=automatisch_types-build /app/packages/types/ /app/packages/types/
COPY --from=automatisch_web-build /app/packages/web/ /app/packages/web/
WORKDIR /app/packages/cli
# The normal package.json should be copied after the install into the container
COPY  packages/cli/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
RUN yarn run build
# final stage
FROM base
COPY --from=automatisch_docs-build /app/packages/docs /app/packages/docs
COPY --from=automatisch_e2e-tests-build /app/packages/e2e-tests /app/packages/e2e-tests
COPY --from=automatisch_types-build /app/packages/types /app/packages/types
COPY --from=automatisch_web-build /app/packages/web /app/packages/web
COPY --from=automatisch_backend-build /app/packages/backend /app/packages/backend
COPY --from=automatisch_cli-build /app/packages/cli /app/packages/cli