import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    TagService,
    TagPopupService,
    TagComponent,
    TagDetailComponent,
    TagDialogComponent,
    TagPopupComponent,
    TagDeletePopupComponent,
    TagDeleteDialogComponent,
    tagRoute,
    tagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tagRoute,
    ...tagPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagComponent,
        TagDetailComponent,
        TagDialogComponent,
        TagDeleteDialogComponent,
        TagPopupComponent,
        TagDeletePopupComponent,
    ],
    entryComponents: [
        TagComponent,
        TagDialogComponent,
        TagPopupComponent,
        TagDeleteDialogComponent,
        TagDeletePopupComponent,
    ],
    providers: [
        TagService,
        TagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTagModule {}
