import React, { useState } from "react";
import { Tabs, Card, Collapse, Typography } from "antd";
import { useMediaQuery } from "@mui/material";
import styles from "./ProfileHome.module.scss";
import ProfileHomeAds from "../ProfileHomeAds/ProfileHomeAds";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const ProfileHome = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeKey, setActiveKey] = useState("1");

  // Job data for the sections
  const trendingJobs = [
    { id: 1, title: "Senior React Developer", company: "Google", location: "San Francisco" },
    { id: 2, title: "UI/UX Designer", company: "Apple", location: "New York" },
    { id: 3, title: "Frontend Engineer", company: "Amazon", location: "Seattle" },
    { id: 4, title: "Backend Developer", company: "Meta", location: "Austin" },
  ];
  const recommendedJobs = [
    { id: 5, title: "Cloud Solutions Architect", company: "Microsoft", location: "Boston" },
    { id: 6, title: "DevOps Engineer", company: "Netflix", location: "Los Angeles" },
    { id: 7, title: "System Analyst", company: "Cisco", location: "Denver" },
  ];
  const recentlySearchedJobs = [
    { id: 8, title: "Product Manager", company: "Spotify", location: "Chicago" },
    { id: 9, title: "Data Scientist", company: "IBM", location: "Austin" },
    { id: 10, title: "QA Engineer", company: "Oracle", location: "San Diego" },
  ];

  const JobCard = ({ title, company, location }) => (
    <Card className={styles.jobCard} hoverable>
      <Title level={5} className={styles.jobTitle}>
        {title}
      </Title>
      <Paragraph className={styles.jobCompany}>{company}</Paragraph>
      <Paragraph className={styles.jobLocation}>{location}</Paragraph>
    </Card>
  );

  return (
    <div className={styles.profileHomeContainer}>
      <div>
        <ProfileHomeAds />
      </div>
      {!isMobile ? (
        // Tabs for larger screens
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          tabBarStyle={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "left" }}
        >
          <TabPane tab="Trending Jobs" key="1">
            <div className={styles.tabContent}>
              {trendingJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabPane>
          <TabPane tab="Recommended Jobs" key="2">
            <div className={styles.tabContent}>
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabPane>
          <TabPane tab="Recently Searched Jobs" key="3">
            <div className={styles.tabContent}>
              {recentlySearchedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </TabPane>
        </Tabs>
      ) : (
        // Collapse for mobile screens
        <Collapse accordion>
          <Panel header="Trending Jobs" key="1">
            <div className={styles.collapseContent}>
              {trendingJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </Panel>
          <Panel header="Recommended Jobs" key="2">
            <div className={styles.collapseContent}>
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </Panel>
          <Panel header="Recently Searched Jobs" key="3">
            <div className={styles.collapseContent}>
              {recentlySearchedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </Panel>
        </Collapse>
      )}
    </div>
  );
};

export default ProfileHome;
