export const bodyToStore = (body, region) => {
    return {
        region: region,
        name: body.name,
        address: body.address,
    };
};