import clsx from "clsx";
import { redirect } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { auth, signIn } from "../auth";
import { DASHBOARD_URL } from "../constants";
import { SignInIcon } from "../icons";
import { MarketingLayout } from "../layouts/Marketing";
import { Button, LinkButton } from "../primitives/Button";
import { Container } from "../primitives/Container";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div
      className={clsx(
        className,
        "p-9 border border-[--color-border] rounded-[--radius]"
      )}
      {...props}
    >
      <h4 className="mb-4 font-semibold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
}

export default async function Index() {
  const session = await auth();

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  return (
    <MarketingLayout>
      <Container className="my-20">
        <div className="mb-12">
          <h1 className="max-w-[400px] mb-9 text-4xl font-extrabold leading-tight">
            Structure your messy data
          </h1>
          <p className="max-w-[460px] text-xl text-[--color-text-lighter]">
            Use Beacon to reshape your messy data and data sources into a format
            that is easy to understand and use.
          </p>
        </div>
        <div className="flex gap-6">
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button icon={<SignInIcon />}>Sign in</Button>
          </form>
          <LinkButton
            href="https://docs.google.com/document/d/1BDNbizKlkALN289GSLoOwn79AaJKYkAVR--Y7owV8jw/edit?tab=t.0#heading=h.jseyoukuisay"
            target="_blank"
            variant="secondary"
          >
            Learn more
          </LinkButton>
        </div>
      </Container>
      <Container className="my-20">
        <h2 className="mb-10 text-2xl font-bold">Features</h2>
        <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          <Feature
            description={
              <>
                Extract data from diverse sources including PDFs, websites,
                APIs, spreadsheets, videos, and more - no matter how messy or
                poorly formatted.
              </>
            }
            title="Universal Data Extraction"
          />
          <Feature
            description={
              <>
                Transform raw data into structured formats through an iterative
                process combining AI analysis with human validation and
                refinement.
              </>
            }
            title="Interactive Refinement"
          />
          <Feature
            description={
              <>
                Generate custom data products like reports, documents, and
                analyses that match your exact needs and specifications.
              </>
            }
            title="Flexible Outputs"
          />
          <Feature
            description={
              <>
                Validate data extraction feasibility upfront and continuously
                monitor quality through built-in auditing tools.
              </>
            }
            title="Quality Assurance"
          />
          <Feature
            description={
              <>
                Process data in real-time as it arrives, allowing for continuous
                extraction and refinement of your data sources.
              </>
            }
            title="Continuous Processing"
          />
          <Feature
            description={
              <>
                Multiple input methods including natural language, visual
                annotations, and golden examples to guide the extraction
                process.
              </>
            }
            title="Flexible Input Methods"
          />
        </div>
      </Container>
    </MarketingLayout>
  );
}
