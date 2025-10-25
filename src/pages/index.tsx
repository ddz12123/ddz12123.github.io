import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageTechStack from '@site/src/components/HomepageTechStack';
import HomepageLearningPath from '@site/src/components/HomepageLearningPath';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGradient}></div>
        <div className={styles.heroPattern}></div>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            <span className={styles.heroTitleMain}>{siteConfig.title}</span>
            <span className={styles.heroTitleSub}>前端开发知识库</span>
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.heroButtons}>
            <Link
              className={clsx('button button--primary button--lg', styles.heroButton)}
              to="/docs/面试题/javaScript/new操作符">
              <span>开始学习前端开发</span>
              <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              className={clsx('button button--outline button--lg', styles.heroButtonSecondary)}
              to="/">
              查看最佳实践
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>技术文档</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100+</div>
              <div className={styles.statLabel}>代码示例</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>持续更新</div>
              <div className={styles.statLabel}>最新技术</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 前端开发知识库`}
      description="全面的前端开发技术文档，包含HTML、CSS、JavaScript、React等核心技术">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageTechStack />
        <HomepageLearningPath />
      </main>
    </Layout>
  );
}
