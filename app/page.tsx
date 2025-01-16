import clsx from "clsx";
import { redirect } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { auth, signIn } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { SignInIcon } from "@/icons";
import { MarketingLayout } from "@/layouts/Marketing";
import { Button, LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
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
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>Structure your messy data</h1>
          <p className={styles.heroLead}>
            Use Beacon to reshape your messy data and data sources into a format
            that is easy to understand and use.
          </p>
        </div>
        <div className={styles.heroActions}>
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
      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featuresGrid}>
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
