import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BlogComponentsPage, BlogUpdatePage } from './blog.page-object';

describe('Blog e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let blogUpdatePage: BlogUpdatePage;
    let blogComponentsPage: BlogComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Blogs', async () => {
        await navBarPage.goToEntity('blog');
        blogComponentsPage = new BlogComponentsPage();
        expect(await blogComponentsPage.getTitle()).toMatch(/gatewayApp.blogBlog.home.title/);
    });

    it('should load create Blog page', async () => {
        await blogComponentsPage.clickOnCreateButton();
        blogUpdatePage = new BlogUpdatePage();
        expect(await blogUpdatePage.getPageTitle()).toMatch(/gatewayApp.blogBlog.home.createOrEditLabel/);
        await blogUpdatePage.cancel();
    });

    it('should create and save Blogs', async () => {
        await blogComponentsPage.clickOnCreateButton();
        await blogUpdatePage.setNameInput('name');
        expect(await blogUpdatePage.getNameInput()).toMatch('name');
        await blogUpdatePage.setHandleInput('handle');
        expect(await blogUpdatePage.getHandleInput()).toMatch('handle');
        await blogUpdatePage.userSelectLastOption();
        await blogUpdatePage.save();
        expect(await blogUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
