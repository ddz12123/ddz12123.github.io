import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type TechItem = {
    name: string;
    icon: string;
    description: string;
    color: string;
    category: string;
};

const TechList: TechItem[] = [
    {
        name: 'HTML5',
        icon: '🌐',
        description: '现代网页结构标准',
        color: '#e34c26',
        category: '基础技术'
    },
    {
        name: 'CSS3',
        icon: '🎨',
        description: '样式与布局技术',
        color: '#1572b6',
        category: '基础技术'
    },
    {
        name: 'JavaScript',
        icon: '⚡',
        description: '现代JavaScript开发',
        color: '#f7df1e',
        category: '核心语言'
    },
    {
        name: 'React',
        icon: '⚛️',
        description: '用户界面构建库',
        color: '#61dafb',
        category: '前端框架'
    },
    {
        name: 'TypeScript',
        icon: '📘',
        description: '类型安全的JavaScript',
        color: '#3178c6',
        category: '开发工具'
    },
    {
        name: 'Node.js',
        icon: '🟢',
        description: '服务器端JavaScript',
        color: '#339933',
        category: '后端技术'
    },
    {
        name: 'Webpack',
        icon: '📦',
        description: '模块打包工具',
        color: '#8dd6f9',
        category: '构建工具'
    },
    {
        name: 'Git',
        icon: '📝',
        description: '版本控制系统',
        color: '#f05032',
        category: '开发工具'
    }
];

function TechCard({ name, icon, description, color, category }: TechItem) {
    return (
        <div className={clsx('col col--3')} style={{ marginBottom: '1rem' }}>
            <div className={styles.techCard}>
                <div className={styles.techIcon} style={{ backgroundColor: color }}>
                    <span className={styles.techEmoji}>{icon}</span>
                </div>
                <div className={styles.techContent}>
                    <Heading as="h4" className={styles.techName}>{name}</Heading>
                    <p className={styles.techDescription}>{description}</p>
                    <span className={styles.techCategory}>{category}</span>
                </div>
            </div>
        </div>
    );
}

export default function HomepageTechStack(): ReactNode {
    return (
        <section className={styles.techStack}>
            <div className="container">
                <div className={styles.techStackHeader}>
                    <Heading as="h2" className={styles.techStackTitle}>
                        技术栈覆盖
                    </Heading>
                    <p className={styles.techStackSubtitle}>
                        从基础到高级，涵盖现代前端开发的所有核心技术
                    </p>
                </div>
                <div className="row">
                    {TechList.map((props, idx) => (
                        <TechCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
