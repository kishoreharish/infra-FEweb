import React, { useState, useEffect } from "react";
import { Tabs, Card, Alert, Spin } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./ProfileHome.module.scss";

const { TabPane } = Tabs;

// Dummy data for the charts
const dummyAnalyticsData = [
  { name: "Jobs Applied", value: 30 },
  { name: "Selected", value: 10 },
  { name: "Upcoming Interviews", value: 5 },
];

const ProfileHome = () => {
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [recentlySearchedJobs, setRecentlySearchedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        // Simulate API response with dummy data
        const mockResponse = {
          trending: [
            { id: 1, title: "Frontend Developer", company: "ABC Corp", location: "New York" },
            { id: 2, title: "Backend Developer", company: "XYZ Ltd", location: "San Francisco" },
          ],
          recommended: [
            { id: 3, title: "Full Stack Engineer", company: "Tech Giant", location: "Remote" },
          ],
          recent: [
            { id: 4, title: "Data Analyst", company: "Data Inc", location: "Seattle" },
          ],
        };

        setTrendingJobs(mockResponse.trending || []);
        setRecommendedJobs(mockResponse.recommended || []);
        setRecentlySearchedJobs(mockResponse.recent || []);
      } catch (err) {
        setError("Failed to load job data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Loading Profile Home..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className={styles.profileHomeContainer}>
      {/* Dummy Rectangle Image Carousel */}
      <div className={styles.imageCarousel}>
        <img
          src="https://ps.w.org/jobs-portal/assets/banner-772x250.jpg?rev=2401294"
          alt="Carousel Placeholder"
          className={styles.carouselImage}
        />
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for jobs, companies, or skills..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      {/* Welcome Card */}
      <Card className={styles.welcomeCard}>
        <h2>Welcome, Candidate Name!</h2>
        <p>Candidate Title</p>
        <button className={styles.ctaButton}>Get Started</button>
      </Card>

      {/* Analytics Card */}
      <Card className={styles.analyticsCard}>
        <h3>Analytics</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dummyAnalyticsData}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dummyAnalyticsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Jobs Card */}
      <Card className={styles.jobsCard}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Trending Jobs" key="1">
            <div className={styles.jobList}>
              {trendingJobs.map((job) => (
                <Card key={job.id} title={job.title}>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                </Card>
              ))}
            </div>
          </TabPane>
          <TabPane tab="Recommended Jobs" key="2">
            <div className={styles.jobList}>
              {recommendedJobs.map((job) => (
                <Card key={job.id} title={job.title}>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                </Card>
              ))}
            </div>
          </TabPane>
          <TabPane tab="Recently Searched Jobs" key="3">
            <div className={styles.jobList}>
              {recentlySearchedJobs.map((job) => (
                <Card key={job.id} title={job.title}>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                </Card>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* Recent Applications Card */}
      <Card className={styles.recentApplicationsCard}>
        <h3>Recent Applications</h3>
        <p>Recent application history goes here.</p>
      </Card>

      {/* Saved Jobs Card */}
      <Card className={styles.savedJobsCard}>
        <h3>Saved Jobs</h3>
        <p>Saved jobs list goes here.</p>
      </Card>
    </div>
  );
};

export default ProfileHome;
