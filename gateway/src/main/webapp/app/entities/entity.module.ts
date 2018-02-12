import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayBlogModule } from './blog/blog.module';
import { GatewayEntryModule } from './entry/entry.module';
import { GatewayTagModule } from './tag/tag.module';
import { GatewayProductModule } from './product/product.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayBlogModule,
        GatewayEntryModule,
        GatewayTagModule,
        GatewayProductModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
