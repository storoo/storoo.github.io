declare module '*.md' {
  const content: string
  export default content
}

// webpack's require.context, used by data/talks/content/index.ts
declare namespace NodeJS {
  interface Require {
    context(directory: string, useSubdirectories: boolean, regExp: RegExp): {
      keys(): string[]
      (id: string): any
    }
  }
}
