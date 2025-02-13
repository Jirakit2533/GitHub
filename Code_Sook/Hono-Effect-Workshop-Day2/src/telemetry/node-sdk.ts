import { NodeSdk } from "@effect/opentelemetry"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"

export const NodeSdkLive = NodeSdk.layer(() => {
  return {
    instrumentations: [getNodeAutoInstrumentations()],
    metricReader: new PrometheusExporter({
      port: 9464,
    }),
    resource: {
      serviceName: "Overtime Tracking API",
    },
    spanProcessor: new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: "http://34.126.124.178:4318/v1/traces", // Tempo OTLP HTTP
      }),
    ),
  }
})
