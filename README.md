# Prisma setup in a project


make a package.json
```bash
npm init -y
```

## install packages
npm i --save-dev prisma typescript ts-node @types/node nodemon @prisma/client


## Make a tsconfig.ts
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}

## initiate the prisma
npx prisma init --datasource-provider postgresql
it will make a prisma dir

## make a model
model User{

}

## make the migration of the model to prisma
npx prisma migrate dev --name init
init is the name of the migration

## make sure to make crud api routes

## generate the client
npx prisma generate

## if schema is changed then use this to apply the change
npx prisma db push




