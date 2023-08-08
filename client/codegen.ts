
import type { CodegenConfig } from '@graphql-codegen/cli';


const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["./graphql/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    './generated/' : {
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: []
    }
  }
};

export default config;
