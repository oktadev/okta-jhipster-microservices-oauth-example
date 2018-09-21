import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlog } from 'app/shared/model/blog/blog.model';

type EntityResponseType = HttpResponse<IBlog>;
type EntityArrayResponseType = HttpResponse<IBlog[]>;

@Injectable({ providedIn: 'root' })
export class BlogService {
    private resourceUrl = SERVER_API_URL + 'blog/api/blogs';
    private resourceSearchUrl = SERVER_API_URL + 'blog/api/_search/blogs';

    constructor(private http: HttpClient) {}

    create(blog: IBlog): Observable<EntityResponseType> {
        return this.http.post<IBlog>(this.resourceUrl, blog, { observe: 'response' });
    }

    update(blog: IBlog): Observable<EntityResponseType> {
        return this.http.put<IBlog>(this.resourceUrl, blog, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBlog>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBlog[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
