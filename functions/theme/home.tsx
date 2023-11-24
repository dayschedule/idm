import { ShortLink } from "../models/shortlink";
import { SiteData } from "../models/siteData";
import { Layout } from "./layout";

const getIcon = (url: string) => {
  const host = new URL(url).hostname;
  return `https://logo.clearbit.com/${host}?size=48`;
};

const LinkList = (props: SiteData) => {
  return (
    <ul class="list-group my-3" id="links">
      {props.links.map((link: ShortLink, index: number) => (
        <li
          data-id={link.key}
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <div class="d-flex justify-content-start me-3">
            <img src={getIcon(link.url)} width="48" height="48" />
          </div>
          <div class="d-flex justify-content-between w-100">
            <div>
              <div class="mb-1">
                <a
                  class="font-weight-bold"
                  href={link.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.short_url.replace("https://", "")}
                </a>
                <button
                  type="button"
                  class="btn btn-link text-secondary p-0 mx-2"
                  title="Copy"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <a
                class="text-muted text-decoration-none"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.url}
              </a>
            </div>
            <div class="my-auto">
              <div class="dropdown">
                <button
                  class="btn btn-link text-secondary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#" onClick="edit">
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-danger"
                      href="#"
                      onClick="delete"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const Home = (props: SiteData) => (
  <Layout {...props}>
    <div>
      <section class="hero px-3 py-5 border-bottom bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="text-center">
                <h1 class="display-4 fw-bold mb-3">URL Shortener</h1>
                <p class="fs-4">Create free short links!</p>
              </div>
              <div class="card shadow">
                <div class="card-body m-lg-5">
                  <form id="urlShortenForm" role="form">
                    <div class="input-group mb-4">
                      <input
                        type="url"
                        class="form-control form-control-lg"
                        id="urlInput"
                        placeholder="url..."
                        aria-label="URL to shorten"
                        required
                      />
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        id="shortenBtn"
                      >
                        Shorten URL
                        <span
                          class="spinner-border spinner-border-sm d-none"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </div>
                  </form>
                  <LinkList {...props}></LinkList>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
