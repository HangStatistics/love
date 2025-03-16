document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const moonlightForm = document.getElementById('moonlightForm');
    const resultContainer = document.getElementById('resultContainer');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    const storyRating = document.getElementById('storyRating');
    const storyRatingValue = document.getElementById('storyRatingValue');
    const desireLevel = document.getElementById('desireLevel');
    const desireLevelValue = document.getElementById('desireLevelValue');
    
    const scoreValue = document.getElementById('scoreValue');
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');
    const resultImage = document.getElementById('resultImage');
    
    // 更新滑块值显示
    storyRating.addEventListener('input', function() {
        storyRatingValue.textContent = this.value;
    });
    
    desireLevel.addEventListener('input', function() {
        desireLevelValue.textContent = this.value;
    });
    
    // 表单提交处理
    moonlightForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateResult();
    });
    
    // 重新测试按钮
    tryAgainBtn.addEventListener('click', function() {
        resultContainer.style.display = 'none';
        moonlightForm.reset();
        storyRatingValue.textContent = '5';
        desireLevelValue.textContent = '5';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 分享按钮
    shareBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const score = scoreValue.textContent;
        const text = `我在"白月光捕捉器"测试中获得了${score}分的缘分指数！看看你与白月光的缘分如何？`;
        
        // 检查是否支持Web Share API
        if (navigator.share) {
            navigator.share({
                title: '白月光捕捉器测试结果',
                text: text,
                url: window.location.href
            })
            .catch(error => {
                alert('分享失败，请手动分享。');
            });
        } else {
            // 不支持Web Share API，提供复制文本功能
            const tempInput = document.createElement('textarea');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert('分享文本已复制到剪贴板！');
        }
    });
    
    // 计算结果
    function calculateResult() {
        // 获取表单数据
        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value;
        const age = parseInt(document.getElementById('age').value);
        const story = document.getElementById('story').value;
        const storyRatingValue = parseInt(document.getElementById('storyRating').value);
        const desireLevelValue = parseInt(document.getElementById('desireLevel').value);
        
        // 计算得分
        let score = calculateScore(name, gender, age, story, storyRatingValue, desireLevelValue);
        
        // 显示结果
        displayResult(score, name);
        
        // 隐藏表单，显示结果
        resultContainer.style.display = 'block';
        
        // 滚动到结果区域
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 计算得分算法
    function calculateScore(name, gender, age, story, storyRating, desireLevel) {
        // 基础分数
        let score = 50;
        
        // 故事感人程度影响（最高30分）
        score += storyRating * 3;
        
        // 渴望程度影响（最高20分）
        score += desireLevel * 2;
        
        // 故事长度影响（最高10分）
        const storyLength = story.length;
        if (storyLength > 200) {
            score += 10;
        } else if (storyLength > 100) {
            score += 5;
        }
        
        // 名字长度影响（-5到5分）
        const nameLength = name.length;
        if (nameLength > 3) {
            score += 5;
        } else {
            score -= 5;
        }
        
        // 随机因素（-10到10分）
        const randomFactor = Math.floor(Math.random() * 21) - 10;
        score += randomFactor;
        
        // 确保分数在0-100之间
        score = Math.max(0, Math.min(100, score));
        
        return Math.round(score);
    }
    
    // 显示结果
    function displayResult(score, name) {
        // 设置分数
        scoreValue.textContent = score;
        
        // 根据分数设置不同的结果
        if (score >= 80) {
            resultTitle.textContent = `恭喜！你很可能会追到${name}`;
            resultDescription.textContent = `你与${name}的缘分指数高达${score}分！你们之间的故事感人至深，你的真心必将打动对方。坚持下去，勇敢表达你的感情，幸福就在不远处等着你！`;
            resultImage.src = 'https://i.imgur.com/JZSJnfJ.png'; // 成功图片
        } else if (score >= 60) {
            resultTitle.textContent = `有希望！继续努力追求${name}`;
            resultDescription.textContent = `你与${name}的缘分指数为${score}分，前景乐观！你们之间有美好的回忆，但可能还需要更多的努力和耐心。不要放弃，多创造共同的美好回忆，成功的几率很大！`;
            resultImage.src = 'https://i.imgur.com/8YfJLHJ.png'; // 希望图片
        } else if (score >= 40) {
            resultTitle.textContent = `机会渺茫，但不妨一试`;
            resultDescription.textContent = `你与${name}的缘分指数为${score}分，情况不太乐观。但爱情本就充满变数，如果你真的很在乎对方，不妨勇敢表达。即使结果不如人意，至少不会留下遗憾。`;
            resultImage.src = 'https://i.imgur.com/JdVfqwP.png'; // 一般图片
        } else {
            resultTitle.textContent = `可能需要放下对${name}的执念`;
            resultDescription.textContent = `你与${name}的缘分指数仅有${score}分。有时候，爱一个人最好的方式是祝福TA。也许你们注定是彼此生命中的过客，但每段感情都会让我们成长。期待你遇见真正属于你的那个人！`;
            resultImage.src = 'https://i.imgur.com/8YGjnLJ.png'; // 失败图片
        }
    }
});
