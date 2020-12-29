let getUrlContent = require('./get-url-content');

describe('Test top menu bad xapi', () => { 
    let header;

    beforeAll(async () => {
        let deviceType = 'PHONE';
        let url = `http://discoverypagesxapi-mcom-128.tbe.zeus.fds.com:8080/xapi/discover/v1/page?pathname=/shop/wedding-registry/kitchen/air-fryers-deep-fryers&id=180345&_additionalStoreLocations=5423&cm_sp=mew_navigation_registry_gift_categories-_-kitchen-_-180345_airfryers&_application=SITE&_navigationType=BROWSE&_deviceType=${deviceType}&_shoppingMode=WEDDING_REGISTRY&_regionCode=US&_customerState=GUEST&currencyCode=USD&_customerExperiment=485-21`;
        let content = await getUrlContent(url);
        header = content.header;
    });

    test('there is a header.meta.properties.topMenu', () => {
        let ids = '64967,70529,7497,7498,7495,49573,178846,152943,63538,72435';
        expect(header.meta.properties.topMenu).toBe(ids);
    });

    test('there is a header.meta.context', () => {
        expect(typeof header.meta.context).toBe("object");
    });

    test('and the viewType is Compact', () => {
        expect(header.meta.context.viewType).toBe("Compact");
    });

    test('for each id in header.meta.properties.topMenu, the id is in the context.menu object', () => {
        let ids = header.meta.properties.topMenu.split(',');

        for (id in ids) {
            let topMenuId = ids[id];
            expect(typeof header.menu[topMenuId]).toBe("object");
        }
    });

    test('for each id in header.meta.properties.topMenu, the id is in the context.menu object', () => {
        expect(typeof header.menu[64967]).toBe("object");
        expect(typeof header.menu[70529]).toBe("object");
        expect(typeof header.menu[7497]).toBe("object");
        expect(typeof header.menu[7498]).toBe("object");
        expect(typeof header.menu[7495]).toBe("object");
        expect(typeof header.menu[49573]).toBe("object");
        expect(typeof header.menu[178846]).toBe("object");
    });

    test('for each id in header.meta.properties.topMenu, the id is in the context.menu object. Part 2', () => {
        expect(typeof header.menu[152943]).toBe("object");
        expect(typeof header.menu[63538]).toBe("object");
        expect(typeof header.menu[72435]).toBe("object");
    });
});
