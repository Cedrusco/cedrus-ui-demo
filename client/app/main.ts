class TestController {
    static $inject = ['$scope', '$cedrusUIConfig'];
    flag: boolean;
    tempPie: Array<any>;
    cdChartOptions: CdCharts.ICdPieOptions = {
        chartType: 'pieChart',
        width: 200,
        height: 200,
        donutWidth: 10,
        legend: {
            enabled: true,
            position: 'bottom'
        },
        series: [{
            dataset: 'dataset0',
            visible: true,
            color: 'purple',
            drawDots: false,
            label: 'regular'
        }, {
            dataset: 'dataset1',
            visible: true,
            color: 'green',
            drawDots: true,
            label: 'modded'
        }],
        animation: {
            duration: 125,
            delay: 125
        },
        tooltip: {
            enabled: true,
            position: 'w',
            customText: function (d) {
                d = d.data;
                return d['count'] + ' votes for ' + d['label'];
            }
        },
        countProperty: 'count',
        labelProperty: 'label'
    };
    chartData;
    csvData;
    pieData = [];
    pieData2 = [];
    newData = [];
    words = 'theseAreWords';
    constructor(private $scope, private $$cedrusUIConfig) {
        var vm = this;
        vm.chartData = {
            dataset0: [],
            dataset1: []
        };

        d3.csv('AAcountryCrime.csv', function (d: any) {
            vm.csvData = d;
            vm.flag = true;
            vm.pieData = d.columns.slice(1).map((column, i) => {
                return {
                    count: +d[0][column],
                    label: column
                };
            });
            vm.pieData2 = d.columns.slice(1).map((column, i) => {
                return {
                    count: +d[1][column],
                    label: column
                };
            });
            // vm.newData = vm.csvData.map(function (datum, index) {
            //     datum = angular.copy(datum);
            //     if (index % 2 === 0) datum['MURDER'] = datum['MURDER'] * 2;
            //     else datum['MURDER'] = datum['MURDER'] / 2;
            //     return datum;
            // });
            console.log(vm.pieData);
            vm.chartData = angular.extend({}, vm.chartData, { dataset0: vm.pieData, dataset1: vm.pieData2 });
            console.log(vm.chartData);
            $scope.$digest();
        });
    }

    toggleSeries() {
        var vm = this;
        vm.flag = !vm.flag;
        if (vm.flag) vm.chartData = angular.extend({}, vm.chartData, { dataset1: vm.pieData, dataset0: vm.pieData2 });
        else vm.chartData = angular.extend({}, vm.chartData, { dataset0: vm.pieData, dataset1: vm.pieData2 });

    }
    evenOnly(d) {
        return d['YEAR'] % 2 === 0;
    };

    changeData(d) {
        this.chartData.dataset0 = this.chartData.dataset0.slice(1);
        this.chartData = angular.copy(this.chartData);
    };

    allData(d) { return true; }

    filter(source, dest, filterFunction) {
        this[dest] = [this[source].filter(filterFunction)];
    }
    hideLegend() {
        this.cdChartOptions.legend.enabled = !this.cdChartOptions.legend.enabled;
        this.cdChartOptions = angular.copy(this.cdChartOptions);
    }
    hideData(prop) {
        this.flag = !this.flag;
        var sliceNum = this.flag ? 0 : 4;
        this.pieData = [this.tempPie[0].slice(sliceNum)];
    };
}
angular.module('testApp', ['cedrus.ui','ui.router'])
    .controller('TestController', TestController);

angular.module('testApp')
    .constant('testConstants', { firstLevel: 'flat text', obj: { key: 'deep obj.key text' } });