import React, { useState } from 'react';

const EvaluationPage = ({ addSubmission }) => {
  const [formData, setFormData] = useState({
    name: '',
    gain: '',
    content: '',
    teacher: '',
    rating: 0,
    feedback: ''
  });

  const [language, setLanguage] = useState('cn');
  const [hoverRating, setHoverRating] = useState(0);

  const labels = {
    cn: {
      title: '课程评价表单',
      name: '您的姓名',
      namePlaceholder: '请输入您的姓名',
      teacher: '授课教师',
      teacherPlaceholder: '请输入教师姓名',
      content: '本节课的内容',
      contentPlaceholder: '请描述本节课的主要内容...',
      gain: '本节课的收获',
      gainPlaceholder: '请描述您从本节课中学到了什么...',
      rating: '评分',
      feedback: '其他反馈与建议',
      feedbackPlaceholder: '请提供其他建议或意见...',
      submit: '提交评价',
      required: '（必填）'
    },
    en: {
      title: 'Course Evaluation Form',
      name: 'Your Name',
      namePlaceholder: 'Please enter your name',
      teacher: 'Instructor',
      teacherPlaceholder: 'Please enter the teacher\'s name',
      content: 'Content of this lesson',
      contentPlaceholder: 'Please describe the main content of this lesson...',
      gain: 'What did you gain from this lesson?',
      gainPlaceholder: 'Please describe what you learned from this lesson...',
      rating: 'Rating',
      feedback: 'Additional Feedback',
      feedbackPlaceholder: 'Please provide additional suggestions or comments...',
      submit: 'Submit Evaluation',
      required: '（Required）'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 验证必填字段
    if (!formData.name || !formData.teacher || !formData.content || !formData.gain) {
      alert(language === 'cn' ? '请填写所有必填字段！' : 'Please fill in all required fields!');
      return;
    }
    
    addSubmission(formData);
    
    alert(language === 'cn' ? '评价提交成功！' : 'Evaluation submitted successfully!');
    
    // 重置表单
    setFormData({
      name: '',
      gain: '',
      content: '',
      teacher: '',
      rating: 0,
      feedback: ''
    });
    setHoverRating(0);
  };

  const currentLabels = labels[language];

  return (
    <div className="card">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, color: '#444' }}>{currentLabels.title}</h1>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          background: '#f8f9fa',
          padding: '0.25rem',
          borderRadius: '5px'
        }}>
          <button
            onClick={() => setLanguage('cn')}
            style={{
              padding: '0.5rem 1.5rem',
              border: 'none',
              borderRadius: '3px',
              background: language === 'cn' ? '#667eea' : 'transparent',
              color: language === 'cn' ? 'white' : '#666',
              cursor: 'pointer',
              fontWeight: language === 'cn' ? '600' : '400'
            }}
          >
            中文
          </button>
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '0.5rem 1.5rem',
              border: 'none',
              borderRadius: '3px',
              background: language === 'en' ? '#667eea' : 'transparent',
              color: language === 'en' ? 'white' : '#666',
              cursor: 'pointer',
              fontWeight: language === 'en' ? '600' : '400'
            }}
          >
            English
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* 姓名 */}
          <div className="form-group">
            <label className="form-label">
              {currentLabels.name} <span style={{ color: '#ff4757' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder={currentLabels.namePlaceholder}
              required
            />
          </div>

          {/* 授课教师 */}
          <div className="form-group">
            <label className="form-label">
              {currentLabels.teacher} <span style={{ color: '#ff4757' }}>*</span>
            </label>
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="form-control"
              placeholder={currentLabels.teacherPlaceholder}
              required
            />
          </div>
        </div>

        {/* 评分 */}
        <div className="form-group">
          <label className="form-label">{currentLabels.rating}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || formData.rating) ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ cursor: 'pointer', fontSize: '2rem' }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ color: '#666' }}>
              ({formData.rating === 0 ? language === 'cn' ? '未评分' : 'Not rated' : `${formData.rating}.0`})
            </span>
          </div>
        </div>

        {/* 本节课的内容 */}
        <div className="form-group">
          <label className="form-label">
            {currentLabels.content} <span style={{ color: '#ff4757' }}>*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            placeholder={currentLabels.contentPlaceholder}
            rows="4"
            required
          />
        </div>

        {/* 本节课的收获 */}
        <div className="form-group">
          <label className="form-label">
            {currentLabels.gain} <span style={{ color: '#ff4757' }}>*</span>
          </label>
          <textarea
            name="gain"
            value={formData.gain}
            onChange={handleChange}
            className="form-control"
            placeholder={currentLabels.gainPlaceholder}
            rows="4"
            required
          />
        </div>

        {/* 其他反馈 */}
        <div className="form-group">
          <label className="form-label">{currentLabels.feedback}</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="form-control"
            placeholder={currentLabels.feedbackPlaceholder}
            rows="3"
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #eee'
        }}>
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: '',
                gain: '',
                content: '',
                teacher: '',
                rating: 0,
                feedback: ''
              });
              setHoverRating(0);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid #667eea',
              background: 'transparent',
              color: '#667eea',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {language === 'cn' ? '重置表单' : 'Reset Form'}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            {currentLabels.submit}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluationPage;