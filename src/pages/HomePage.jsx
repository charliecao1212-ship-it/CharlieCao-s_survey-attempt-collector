import React from 'react';

const HomePage = ({ submissions }) => {
  const stats = {
    totalSubmissions: submissions.length,
    averageRating: (submissions.reduce((sum, sub) => sum + sub.rating, 0) / submissions.length).toFixed(1),
    uniqueCourses: [...new Set(submissions.map(sub => sub.course))].length,
    uniqueTeachers: [...new Set(submissions.map(sub => sub.teacher))].length,
  };

  const recentSubmissions = submissions.slice(0, 5);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#444' }}>📊 评价数据概览</h1>
      
      <div className="stats-grid">
        <div className="card stat-card">
          <h3>总提交数</h3>
          <div className="stat-number">{stats.totalSubmissions}</div>
          <p>收集到的所有评价数量</p>
        </div>
        
        <div className="card stat-card">
          <h3>平均评分</h3>
          <div className="stat-number">{stats.averageRating}/5.0</div>
          <p>所有课程的平均满意度</p>
        </div>
        
        <div className="card stat-card">
          <h3>课程数量</h3>
          <div className="stat-number">{stats.uniqueCourses}</div>
          <p>被评价的不同课程</p>
        </div>
        
        <div className="card stat-card">
          <h3>教师数量</h3>
          <div className="stat-number">{stats.uniqueTeachers}</div>
          <p>被评价的不同教师</p>
        </div>
      </div>

      <div className="card">
        <h2>最近提交的评价</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>评价者</th>
                <th>课程名称</th>
                <th>授课教师</th>
                <th>评分</th>
                <th>提交日期</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map(sub => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.name}</td>
                  <td>{sub.course}</td>
                  <td>{sub.teacher}</td>
                  <td>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < sub.rating ? 'active' : ''}`}>★</span>
                      ))}
                    </div>
                  </td>
                  <td>{sub.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {submissions.length > 5 && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <a href="/history" className="btn btn-primary">
              查看全部记录 ({submissions.length} 条)
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;