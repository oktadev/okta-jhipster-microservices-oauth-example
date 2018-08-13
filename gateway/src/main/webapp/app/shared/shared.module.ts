import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { GatewaySharedLibsModule, GatewaySharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [GatewaySharedLibsModule, GatewaySharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [GatewaySharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySharedModule {}
