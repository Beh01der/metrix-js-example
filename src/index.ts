import fs = require('fs');
import { MetricsCollector, MetricItem } from "metrix-js/lib/index";

let inputData = JSON.parse(fs.readFileSync('./data.json').toString());
let metricRules: MetricItem[] = [
    { field: 'code', matcher: 'regex', match: '(\\d)\\d\\d', metric: 'router.hit.$100' },
    { field: 'code', matcher: 'regex', match: '\\d{3}', metric: 'router.hit' },
    { field: 'url', matcher: 'substring', match: 'api/note', metric: 'api.note.hit' },
    { field: 'url', matcher: 'substring', match: 'api/note', metric: 'api.hit' },
    { field: 'url', matcher: 'substring', match: 'api/policy', metric: 'api.hit' }
];

let collector = new MetricsCollector(metric => console.log(metric));
collector.addMetrics(metricRules);

console.log(`For input:
---------------------
${JSON.stringify(inputData, null, 3)}

hits:
---------------------`);

inputData.forEach(item => collector.measure(item));