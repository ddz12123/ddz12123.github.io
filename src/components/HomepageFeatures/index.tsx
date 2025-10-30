import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  icon: string;
  color: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '全面覆盖',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        从HTML/CSS基础到React高级特性，涵盖前端开发的各个方面，
        为不同水平的学习者提供完整的学习路径。
      </>
    ),
    icon: '📚',
    color: '#667eea',
  },
  {
    title: '实用导向',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        注重实际应用，提供大量代码示例和最佳实践，
        帮助你将理论知识转化为实际开发能力。
      </>
    ),
    icon: '⚡',
    color: '#764ba2',
  },
  {
    title: '持续更新',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        紧跟前端技术发展趋势，定期更新内容，
        确保你学到的是最新、最实用的技术知识。
      </>
    ),
    icon: '🚀',
    color: '#f093fb',
  },
];

function Feature({ title, Svg, description, icon, color }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{marginBottom:'1rem'}}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} style={{ backgroundColor: color }}>
          <span className={styles.featureEmoji}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.featureSvgContainer}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            为什么选择我们的知识库？
          </Heading>
          <p className={styles.featuresSubtitle}>
            我们致力于为前端开发者提供最全面、最实用的学习资源
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
