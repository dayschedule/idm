import { SiteData } from "../models/siteData";
import { Layout } from "./layout";

export const Home = (props: SiteData) => (
  <Layout {...props}>
    <div>
      <section class="hero px-3 py-5 border-bottom bg-body-primary bg-gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="text-center">
                <h1 class="display-4 fw-bold mb-2">Create short link</h1>
                <p class="fs-4">Create free short links!</p>
              </div>
              <div class="card shadow">
                <div class="card-body m-lg-5">
                  <form id="form"></form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
