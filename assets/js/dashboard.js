$(function(){
    //swiper - book
    document.querySelectorAll('.book_swiper').forEach(swiperEl => {
        new Swiper(swiperEl, {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 50,
            speed: 600,
            loop: true,
            loopAdditionalSlides: 5,
            loopFillGroupWithBlank: false,
            navigation: {
                nextEl: swiperEl.parentElement.querySelector('.book-next'),
                prevEl: swiperEl.parentElement.querySelector('.book-prev')
            }
        });
    });

    //chart - variables
    const rootStyle = getComputedStyle(document.documentElement);
    const primary = rootStyle.getPropertyValue('--color-primary').trim();
    const darkBlue = rootStyle.getPropertyValue('--color-dark-blue').trim();
    const gray = rootStyle.getPropertyValue('--color-gray').trim();
    const gray4 = rootStyle.getPropertyValue('--color-gray4').trim();
    const gray6 = rootStyle.getPropertyValue('--color-gray6').trim();
    
    //chart - bar
    if($('#chartBar').length > 0) {
        const ctxBar = document.getElementById('chartBar').getContext('2d');
        const gradient_bar = ctxBar.createLinearGradient(0, 0, 0, 200);
        gradient_bar.addColorStop(0, darkBlue);
        gradient_bar.addColorStop(0.8, darkBlue);
        gradient_bar.addColorStop(1, primary);
    
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['25.02','25.03','25.04','25.05','25.06','25.07','25.08','25.09','25.10','25.11','25.12','26.01'],
                datasets: [
                    {
                        data: new Array(12).fill(10),
                        backgroundColor: gray,
                        borderRadius: 6,
                        borderSkipped: false,
                        barThickness: 60,
                        grouped: false,
                        order: 1,
                        hoverBackgroundColor: gray
                    },
                    {
                        data: [4,2,4.5,5,6,8,4,3,5.5,2,4,6],
                        backgroundColor: gradient_bar,
                        borderRadius: 6,
                        borderSkipped: false,
                        barThickness: 60
                    }
                ]
            },
            options: {
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {display: false},
                    tooltip: {
                        filter: function(tooltipItem) {
                            return tooltipItem.datasetIndex !== 0;
                        }
                    } 
                },
                    interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        grid: {display: false},
                        border: {display: false},
                        ticks: {
                            padding: 24,
                            color: gray6,
                            font: {
                                family: 'Pretendard',
                                size: 18,
                                weight: '500'
                            }
                        }
                    },
                    y: {
                        min: 0,
                        max: 10,
                        ticks: {
                            stepSize: 5,
                            padding: 36,
                            color: gray6,
                            crossAlign: 'center',
                            font: {
                                family: 'Pretendard',
                                size: 18,
                                weight: '500'
                            }
                        },
                        grid: {
                            color: gray4,
                            drawBorder: false
                        },
                        border: {display: false}
                    }
                }
            }
        });
    }

    //chart - donut
    if($('#chartDonut').length > 0) {
        const ctxDonut = document.getElementById('chartDonut').getContext('2d');
        const gradient_donut = ctxDonut.createLinearGradient(0, 0, 0, 200);
        gradient_donut.addColorStop(0, darkBlue);
        gradient_donut.addColorStop(0.3, darkBlue);
        gradient_donut.addColorStop(0.7, primary);
        gradient_donut.addColorStop(1, primary);
        const percentage = 76;
        new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                datasets: [{
                data: [(100 - percentage), percentage],
                    backgroundColor: [gray4, gradient_donut],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '76%',
                responsive: true,
                animation: {
                    animateRotate: true,
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: { display: false },
                },
            },
            plugins: [{
                id: 'centerText',
                afterDraw({ ctx, chartArea }) {
                    const cx = (chartArea.left + chartArea.right) / 2;
                    const cy = (chartArea.top + chartArea.bottom) / 2;
                    ctx.save();
                    ctx.fillStyle = '#333';
                    ctx.font = '700 34px Pretendard, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.letterSpacing = '-0.68px';
                    ctx.fillText(`${percentage}%`, cx, cy);
                    ctx.restore();
                }
            }]
        });
    }
});