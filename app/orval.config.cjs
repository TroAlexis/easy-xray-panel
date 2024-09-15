module.exports = {
    api: {
        output: {
            mode: 'tags-split',
            workspace: 'src/generated/api',
            baseUrl: 'http://localhost:3000',
            target: 'api.ts',
            schemas: 'model',
            client: 'svelte-query',
            clean: true,
            prettier: true,
            override: {
                transformer: (options) => {
                    const capitalizedName = options.operationName.charAt(0).toUpperCase() + options.operationName.slice(1);
                    const nameWithoutController = capitalizedName.replace('Controller', '');

                    return {
                        ...options,
                        operationName: nameWithoutController,
                    }
                }
            }
        },
        input: {
            target: './src/api/api.json',
        },
    },
};
