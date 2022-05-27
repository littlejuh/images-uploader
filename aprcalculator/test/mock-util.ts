import { Container } from 'typescript-ioc';

export const mockMethod = (baseType: any, methodName: string) => {
    const method = jest.fn();
    const type = jest.fn().mockImplementation(() => {
        const genType: { [key: string]: any } = {};
        genType[methodName] = method;
        return genType;
    });
    Container.bind(baseType).to(type);
    return method;
};

export const mockMethods = (baseType: any, ...methodNames: Array<string>) => {
    const methods = methodNames.map(() => jest.fn());
    const type = jest.fn().mockImplementation(() => {
        const genType: { [key: string]: any } = {};
        methodNames.forEach((methodName, index) => {
            genType[methodName] = methods[index];
        });
        return genType;
    });
    Container.bind(baseType).to(type);
    return methods;
};

export const mockProperty = (baseType: any, propertyName: string, propertyValue: any) => {
    const type = jest.fn().mockImplementation(() => {
        const genType: { [key: string]: any } = {};
        genType[propertyName] = propertyValue;
        return genType;
    });
    Container.bind(baseType).to(type);
};

export const mockProperties = (baseType: any, properties: any) => {
    const type = jest.fn().mockImplementation(() => {
        return properties;
    });
    Container.bind(baseType).to(type);
};

export const mockMethodOnModule = (moduleName: any, methodName: string) => {
    const method = jest.fn();
    jest.mock(moduleName, () => {
        const genType: { [key: string]: any } = {};
        genType[methodName] = method;
        return genType;
    });
    return method;
};

export const mockFetchResponse = (status: number, bodyResponse: any) => {
    // return jest.fn().mockImplementation(() => {
    return {
        ok: status >= 200 && status < 300,
        json: jest.fn().mockResolvedValue(bodyResponse),
        status
    };
    // });
};
