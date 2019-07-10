const DEFAULT_MAKE_TIME_HOURS_PER_DAY = 3;

function handleTimePickerChangeTotalHours() {
    let totalHoursEl = document.getElementById("makeTimeTotalHours");
    let daysEl = document.getElementById("makeTimeDay");
    let hoursPerDayEl = document.getElementById("makeTimeHoursPerDay");

    let totalHours = totalHoursEl.value;
    let days = daysEl.value;
    let hoursPerDay = hoursPerDayEl.value;

    if (days > 0) {
        hoursPerDay = totalHours / days;
        if (hoursPerDay > 24) {
            hoursPerDay = 24;
            days = Math.ceil(totalHours / hoursPerDay);
        }
    } else {
        hoursPerDay = DEFAULT_MAKE_TIME_HOURS_PER_DAY > totalHours
                ? (totalHours > 24 ? 24 : totalHours)
                : DEFAULT_MAKE_TIME_HOURS_PER_DAY;
        days = Math.ceil(totalHours / hoursPerDay);
    }

    daysEl.value = days;
    hoursPerDayEl.value = (hoursPerDay * 1).toFixed(1);
}

function handleTimePickerChangeHoursPerDay() {
    let totalHoursEl = document.getElementById("makeTimeTotalHours");
    let daysEl = document.getElementById("makeTimeDay");
    let hoursPerDayEl = document.getElementById("makeTimeHoursPerDay");

    let totalHours = totalHoursEl.value;
    let days = daysEl.value;
    let hoursPerDay = hoursPerDayEl.value;

    if (totalHours === 0) {
        totalHours = days * hoursPerDay;
    } else {
        if (days === 0) {
            days = Math.ceil(totalHours / hoursPerDay);
        } else {
            totalHours = days * hoursPerDay;
        }
    }

    daysEl.value = days;
    totalHoursEl.value = (totalHours * 1).toFixed(1);
}

function handleTimePickerChangeDays() {
    let totalHoursEl = document.getElementById("makeTimeTotalHours");
    let daysEl = document.getElementById("makeTimeDay");
    let hoursPerDayEl = document.getElementById("makeTimeHoursPerDay");

    let totalHours = totalHoursEl.value;
    let days = daysEl.value;
    let hoursPerDay = hoursPerDayEl.value;

    if (totalHours === 0) {
        totalHours = days * hoursPerDay;
    } else {
        hoursPerDay = totalHours / days;
        if (hoursPerDay > 24) {
            hoursPerDay = 24;
            totalHours = days * hoursPerDay;
        }
    }

    totalHoursEl.value = (totalHours * 1).toFixed(1);
    hoursPerDayEl.value = (hoursPerDay * 1).toFixed(1);
}

function handleChangeLevel(element) {
    switch (element.value) {
        case '1':
            element.className = element.className.replace(/bg-.*/, 'bg-super-easy');
            break;
        case '2':
            element.className = element.className.replace(/bg-.*/, 'bg-easy');
            break;
        case '3':
            element.className = element.className.replace(/bg-.*/, 'bg-normal');
            break;
        case '4':
            element.className = element.className.replace(/bg-.*/, 'bg-hard');
            break;
        case '5':
            element.className = element.className.replace(/bg-.*/, 'bg-super-hard');
            break;
    }
}

function suggestModels() {
    showLoadingAnimation();
    hideSearchResult();

    let div = document.getElementById("section-search-result");
    div.style.display = 'block';
    div.scrollIntoView({
        behavior: 'smooth'
    });

    let skillLevel = document.getElementById("selectSkillLevel").value;
    let difficulty = document.getElementById("selectDifficulty").value;
    let makeTime = document.getElementById("makeTimeTotalHours").value;

    let url = 'suggestModel';
    let params = 'skillLevel=' + skillLevel + '&difficulty=' + difficulty
            + '&totalHours=' + makeTime;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + params, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let xml = xhr.responseXML;
            if (xml === null) {
                handleResultModelsEmpty();
            } else {
                handleResultModelsReceived(xml);
            }
        }
    };

    xhr.send(null);
}

function searchModels() {
    let modelName = document.getElementById("modelName").value;
    alert('modelName: ' + modelName);

    let div = document.getElementById("section-search-result");
    div.style.display = 'block';
    div.scrollIntoView({
        behavior: 'smooth'
    });


}

function handleResultModelsReceived(resultDocument) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'xsl/result-models.xsl', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            applyXslToResultModels(resultDocument, xhr.responseXML);
        }
    };

    xhr.send(null);
}

function applyXslToResultModels(resultModels, xsl) {
    let xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);

    let pageSize = 30;
    xsltProcessor.setParameter(null, 'pageSize', pageSize);

    let resultHtml = xsltProcessor.transformToFragment(resultModels, document);

    let countModels = resultModels.getElementsByTagName('result-models')[0].childElementCount;

    let div = document.getElementById('search-result');
    div.innerHTML = '<h4 class="text-italic text-center">Tìm thấy ' + countModels + ' kết quả.</h4>';
    div.appendChild(resultHtml);

    initResultPaging(Math.ceil(1.0 * countModels / pageSize));

    hideLoadingAnimation();
    showSearchResult();
}

function showLoadingAnimation() {
    let div = document.getElementById('div-loading');
    div.style.display = 'block';
}

function hideLoadingAnimation() {
    let div = document.getElementById('div-loading');
    div.style.display = 'none';
}

function showSearchResult() {
    let div = document.getElementById('search-result');
    div.style.display = 'block';
}

function hideSearchResult() {
    let div = document.getElementById('search-result');
    div.style.display = 'none';
}

function handleResultModelsEmpty() {
    let div = document.getElementById('search-result');
    div.innerHTML = '<h4 class="text-italic text-center">Không tìm thấy kết quả phù hợp.</h4>';

    initResultPaging(0);

    hideLoadingAnimation();
    showSearchResult();
}

var currentPage;

function initResultPaging(pageCount) {
    let paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    if (pageCount <= 0) {
        return;
    }

    let pagingElement = createPagingElement(pageCount);

    paginationContainer.innerHTML = pagingElement;

    let firstPage = document.getElementById('result-page-1');
    firstPage.className = firstPage.className.replace(/hide/, 'show-flex');
    currentPage = 1;
}

function createPagingElement(pageCount) {
    let pagingEl = '<ul class="pagination">';
    
    pagingEl += '<li class="page-item disabled" id="pagePrevious">'
            + '<a href="#" tabindex="-1">Trước</a>'
            + '</li>';

    pagingEl += '<li class="page-item active">'
            + '<a href="#">1</a>'
            + '</li>';

    for (let i = 2; i <= pageCount; ++i) {
        pagingEl += '<li class="page-item">'
                + '<a href="#">' + i + '</a>'
                + '</li>';
    }

    pagingEl += (pageCount > 1
            ? '<li id="pageNext" class="page-item">'
            : '<li id="pageNext" class="page-item disabled">')
            + '<a href="#">Sau</a>'
            + '</li>';
    
    pagingEl += '</ul>';
    
    return pagingEl;
}

function handlePageClick(pageIndex) {

}

function handlePagePreviousClick() {
    handlePageClick(currentPage - 1);
}

function handlePageNextClick() {
    handlePageClick(currentPage + 1);
}