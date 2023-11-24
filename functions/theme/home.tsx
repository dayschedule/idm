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
      <section class="hero py-5 border-bottom bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="text-center">
                <h1 class="display-4 fw-bold mb-3">
                  An ultrafast URL shortener for the Edges
                </h1>
                <p class="fs-4">
                  An open-source URL shortener to create shorten link with
                  Cloudflare workers. Use SaaS or Deploy on Cloudflare pages
                  with custom domain to build your own short link generator.
                </p>
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
                  <p class="small">
                    <i>
                      Note: The public short links are auto-expired after 30
                      days, sign up for a longer duration.
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-5">
            <div class="col-md-4 mb-4">
              <div class="card h-100 bg-info-subtle">
                <div class="card-body">
                  <i class="bi bi-calendar-date-fill fs-1"></i>
                  <h3 class="card-title my-3">Custom Expiration Date</h3>
                  <p class="lead">
                    Set a specific expiration date for your shortened links to
                    expire after a certain period.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4 mb-4">
              <div class="card h-100 bg-primary-subtle">
                <div class="card-body">
                  <i class="bi bi-bar-chart-fill fs-1"></i>
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title my-3">Report & Analytics</h3>
                    <span class="badge bg-danger my-auto">soon</span>
                  </div>
                  <p class="lead">
                    Track and analyze the performance of your shortened links
                    with detailed analytics and insights.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4 mb-4">
              <div class="card h-100 bg-warning-subtle">
                <div class="card-body">
                  <i class="bi bi-globe fs-1"></i>
                  <h3 class="card-title my-3">Branded Links</h3>
                  <p class="lead">
                    Create branded or custom short links that reflect your brand
                    or company name.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="text-center">
                <h2 class="display-4 fw-bold">
                  Scalable, Open-source, and unparalleled performance.
                </h2>
                <p class="fs-4">
                  Experience unparalleled performance and lightning-fast
                  response times with cutting-edge url shortener solution
                  powered by{" "}
                  <a
                    href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
                    target="_blank"
                    rel="nofollow"
                  >
                    Bootstrap 5
                  </a>{" "}
                  ,{" "}
                  <a href="https://hono.dev/" target="_blank" rel="nofollow">
                    Hono.dev
                  </a>
                  , and{" "}
                  <a
                    href="https://workers.cloudflare.com/"
                    target="_blank"
                    rel="nofollow"
                  >
                    Cloudflare worker
                  </a>{" "}
                  technology.
                </p>
              </div>
              <div class="d-flex justify-content-center">
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://github.com/dayschedule/idm"
                  class="btn btn-dark btn-lg my-3"
                >
                  <i class="bi bi-github me-2"></i> View on Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
