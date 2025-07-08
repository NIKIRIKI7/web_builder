<script setup lang="ts">
type FeatureRow = {
    id: number;
    name: string;
};

type ProductFeature = {
    key: string;
    value: string | boolean;
};

// Продукт может иметь старый (объект) или новый (массив) формат features
type Product = {
    id: number;
    name: string;
    imageUrl: string;
    price: string;
    url: string;
    features: ProductFeature[] | Record<string, string | boolean>;
};

defineProps<{
    title: string;
    features: FeatureRow[];
    products: Product[];
}>();

function getFeatureValue(
    productFeatures: ProductFeature[] | Record<string, string | boolean>,
    featureName: string,
): string | boolean | undefined {
    if (Array.isArray(productFeatures)) {
        return productFeatures.find((f) => f.key === featureName)?.value;
    }
    return productFeatures[featureName];
}
</script>

<template>
    <section class="product-comparison">
        <h2 class="product-comparison__title">{{ title }}</h2>
        <div class="product-comparison__table-wrapper">
            <table class="product-comparison__table">
                <thead>
                <tr>
                    <th class="product-comparison__th product-comparison__th--features">
                        Features
                    </th>
                    <th
                        v-for="product in products"
                        :key="product.id"
                        class="product-comparison__th"
                    >
                        <a :href="product.url" class="product-comparison__product-link">
                            <img
                                :src="product.imageUrl"
                                :alt="product.name"
                                class="product-comparison__product-image"
                            />
                            <h4 class="product-comparison__product-name">
                                {{ product.name }}
                            </h4>
                            <p class="product-comparison__product-price">
                                {{ product.price }}
                            </p>
                        </a>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="featureRow in features" :key="featureRow.id">
                    <td
                        class="product-comparison__td product-comparison__td--feature-name"
                    >
                        {{ featureRow.name }}
                    </td>
                    <td
                        v-for="product in products"
                        :key="product.id"
                        class="product-comparison__td"
                    >
                        <template
                            v-if="
                  typeof getFeatureValue(product.features, featureRow.name) ===
                  'boolean'
                "
                        >
                <span
                    v-if="getFeatureValue(product.features, featureRow.name)"
                    class="product-comparison__checkmark"
                >✓</span
                >
                            <span v-else class="product-comparison__cross">✗</span>
                        </template>
                        <span v-else>{{
                                getFeatureValue(product.features, featureRow.name)
                            }}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style lang="scss" src="./ProductComparisonTable.scss"></style>