export const bodyToStore = (body, region) => {
    return {
      region: region,
      name: body.name,
      address: body.address,
    };
  };
  
  export const responseFromStore = (store) => {
    return {
      id: store.id,
      name: store.name,
    };
  };
  