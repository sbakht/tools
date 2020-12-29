# Install

```
npm install
```

# Examples

```
### Pick 'header.meta.properties' from the disco XAPI call

### Usage: node pick.js <prop1.prop2.prop3.prop4> <url>

node pick.js 'header.meta.properties'  'http://discoverypagesxapi-mcom-128.tbe.zeus.fds.com:8080/xapi/discover/v1/page?pathname=/shop/wedding-registry/kitchen/air-fryers-deep-fryers&id=180345&_additionalStoreLocations=5423&cm_sp=mew_navigation_registry_gift_categories-_-kitchen-_-180345_airfryers&_application=SITE&_navigationType=BROWSE&_deviceType=PHONE&_shoppingMode=WEDDING_REGISTRY&_regionCode=US&_customerState=GUEST&currencyCode=USD&_customerExperiment=485-21'

```

```
### Display json content from a URL

### Usage: node pick.js <url>

node get-url-content.js 'http://discoverypagesxapi-mcom-128.tbe.zeus.fds.com:8080/xapi/discover/v1/page?pathname=/shop/wedding-registry/kitchen/air-fryers-deep-fryers&id=180345&_additionalStoreLocations=5423&cm_sp=mew_navigation_registry_gift_categories-_-kitchen-_-180345_airfryers&_application=SITE&_navigationType=BROWSE&_deviceType=PHONE&_shoppingMode=WEDDING_REGISTRY&_regionCode=US&_customerState=GUEST&currencyCode=USD&_customerExperiment=485-21'

```


```
### Run Jest test to verify data from some URL

npm run test
```