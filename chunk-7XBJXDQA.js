import{a as b}from"./chunk-BNGD4SF5.js";import{T as s,X as c,aa as u,ba as a,g as o,ma as l,r as i,va as d}from"./chunk-LHQMSY42.js";function n(t){t||(l(n),t=a(d));let r=new o(e=>t.onDestroy(e.next.bind(e)));return e=>e.pipe(s(r))}var f=class t{constructor(r){this.http=r;this.#e="https://fakerestapi.azurewebsites.net/api/v1"}#e;searchBooks$(){return this.http.get(`${this.#e}/books`).pipe(n(),i(r=>r.filter(e=>e.id<=5)))}getBookById$(r){return this.http.get(`${this.#e}/books/${r}`)}static \u0275fac=function(e){return new(e||t)(u(b))};static \u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"})};export{f as a};
