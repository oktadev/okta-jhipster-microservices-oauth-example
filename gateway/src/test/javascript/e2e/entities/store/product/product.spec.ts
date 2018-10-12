/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ProductComponentsPage, ProductDeleteDialog, ProductUpdatePage } from './product.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Product e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productUpdatePage: ProductUpdatePage;
    let productComponentsPage: ProductComponentsPage;
    let productDeleteDialog: ProductDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Products', async () => {
        await navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(await productComponentsPage.getTitle()).to.eq('gatewayApp.storeProduct.home.title');
    });

    it('should load create Product page', async () => {
        await productComponentsPage.clickOnCreateButton();
        productUpdatePage = new ProductUpdatePage();
        expect(await productUpdatePage.getPageTitle()).to.eq('gatewayApp.storeProduct.home.createOrEditLabel');
        await productUpdatePage.cancel();
    });

    it('should create and save Products', async () => {
        const nbButtonsBeforeCreate = await productComponentsPage.countDeleteButtons();

        await productComponentsPage.clickOnCreateButton();
        await promise.all([
            productUpdatePage.setTitleInput('title'),
            productUpdatePage.setPriceInput('5'),
            productUpdatePage.setImageInput(absolutePath)
        ]);
        expect(await productUpdatePage.getTitleInput()).to.eq('title');
        expect(await productUpdatePage.getPriceInput()).to.eq('5');
        expect(await productUpdatePage.getImageInput()).to.endsWith(fileNameToUpload);
        await productUpdatePage.save();
        expect(await productUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Product', async () => {
        const nbButtonsBeforeDelete = await productComponentsPage.countDeleteButtons();
        await productComponentsPage.clickOnLastDeleteButton();

        productDeleteDialog = new ProductDeleteDialog();
        expect(await productDeleteDialog.getDialogTitle()).to.eq('gatewayApp.storeProduct.delete.question');
        await productDeleteDialog.clickOnConfirmButton();

        expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
