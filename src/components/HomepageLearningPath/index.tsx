import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type PathItem = {
    title: string;
    description: string;
    icon: string;
    color: string;
    link: string;
    level: string;
    duration: string;
};

const PathList: PathItem[] = [
    {
        title: '前端基础入门',
        description: '从零开始学习HTML、CSS和JavaScript基础，建立扎实的前端开发基础',
        icon: '🎯',
        color: '#667eea',
        link: '/',
        level: '初级',
        duration: '4-6周'
    },
    {
        title: 'JavaScript进阶',
        description: '深入学习现代JavaScript特性，包括ES6+、异步编程、模块化等',
        icon: '⚡',
        color: '#764ba2',
        link: '/',
        level: '中级',
        duration: '6-8周'
    },
    {
        title: 'React框架开发',
        description: '掌握React生态系统，包括Hooks、状态管理、路由等核心概念',
        icon: '⚛️',
        color: '#f093fb',
        link: '/',
        level: '中级',
        duration: '8-10周'
    },
    {
        title: '工程化实践',
        description: '学习现代前端工程化工具，包括构建工具、包管理、测试等',
        icon: '🛠️',
        color: '#4facfe',
        link: '/',
        level: '高级',
        duration: '6-8周'
    }
];

function PathCard({ title, description, icon, color, link, level, duration }: PathItem) {
    return (
        <div className={clsx('col col--6')} style={{ marginBottom: '1rem' }}>
            <Link to={link} className={styles.pathCard}>
                <div className={styles.pathIcon} style={{ backgroundColor: color }}>
                    <span className={styles.pathEmoji}>{icon}</span>
                </div>
                <div className={styles.pathContent}>
                    <div className={styles.pathHeader}>
                        <Heading as="h3" className={styles.pathTitle}>{title}</Heading>
                        <div className={styles.pathMeta}>
                            <span className={styles.pathLevel}>{level}</span>
                            <span className={styles.pathDuration}>{duration}</span>
                        </div>
                    </div>
                    <p className={styles.pathDescription}>{description}</p>
                    <div className={styles.pathAction}>
                        <span className={styles.pathLink}>开始学习 →</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function HomepageLearningPath(): ReactNode {
    return (
        <section className={styles.learningPath}>
            <div className="container">
                <div className={styles.learningPathHeader}>
                    <Heading as="h2" className={styles.learningPathTitle}>
                        学习路径
                    </Heading>
                    <p className={styles.learningPathSubtitle}>
                        系统化的学习计划，帮助你从零基础成长为前端开发专家
                    </p>
                </div>
                <div className="row">
                    {PathList.map((props, idx) => (
                        <PathCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
