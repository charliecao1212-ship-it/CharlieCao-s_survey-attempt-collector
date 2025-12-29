import React, { useState } from 'react';

const HistoryPage = ({ submissions }) => {
  const [filter, setFilter] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const uniqueCourses = ['all', ...new Set(submissions.map(sub => sub.course))];
  
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(filter.toLowerCase()) ||
      sub.course.toLowerCase().includes(filter.toLowerCase()) ||
      sub.teacher.toLowerCase().includes(filter.toLowerCase());
    
    const matchesCourse = selectedCourse === 'all' || sub.course === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#444' }}>📋 历史评价记录</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          alignItems: 'end'
        }}>
          <div className="form-group">
            <label className="form-label">搜索评价记录</label>
            <input
              type="text"
              className="form-control"
              placeholder="搜索评价者、课程或教师..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">按课程筛选</label>
            <select
              className="form-control"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {uniqueCourses.map(course => (
                <option key={course} value={course}>
                  {course === 'all' ? '所有课程' : course}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{ margin: 0 }}>评价记录列表</h2>
          <div style={{ color: '#666' }}>
            共 {filteredSubmissions.length} 条记录
          </div>
        </div>
        
        {filteredSubmissions.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#999'
          }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📭</p>
            <p>未找到匹配的评价记录</p>
            <button 
              onClick={() => { setFilter(''); setSelectedCourse('all'); }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              重置筛选条件
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>评价者</th>
                  <th>课程名称</th>
                  <th>授课教师</th>
                  <th>本节课收获</th>
                  <th>本节课内容</th>
                  <th>评分</th>
                  <th>提交日期</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id}>
                    <td>{sub.id}</td>
                    <td><strong>{sub.name}</strong></td>
                    <td>{sub.course}</td>
                    <td>{sub.teacher}</td>
                    <td style={{ maxWidth: '200px' }}>{sub.gain}</td>
                    <td style={{ maxWidth: '200px' }}>{sub.content}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ 
                              color: i < sub.rating ? '#ffd700' : '#ddd',
                              fontSize: '1rem'
                            }}>★</span>
                          ))}
                        </div>
                        <span>({sub.rating}.0)</span>
                      </div>
                    </td>
                    <td>{sub.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;