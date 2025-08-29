import { test as base } from '@playwright/test';
type myFixture = {
    helloWorld: string;
}

export const test = base.extend<myFixture>({
helloWorld: async({},use)=>{
    console.log("Before every test you must display this message");
     use('helloWorld');
}

})