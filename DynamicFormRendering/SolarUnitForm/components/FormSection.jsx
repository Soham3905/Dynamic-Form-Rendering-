import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FormField } from './formFields'
export const FormSection = ({
  section,
  fields,
  isExpanded,
  formData,
  errors,
  onToggle,
  onFieldChange,
  checkFieldVisibility,
  isFieldMandatory,
}) => {
  return (
    <View className="bg-white rounded-xl">
      <TouchableOpacity
        className="flex-row justify-between items-center border-b border-gray-200"
        onPress={onToggle}
        disabled={!section.sectionConfig.isCollapsable}
      >
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {section.header}
          </Text>
          {section.subHeader && (
            <Text className="text-sm text-gray-600">{section.subHeader}</Text>
          )}
        </View>
        {section.sectionConfig.isCollapsable && (
          <Text className="text-base text-gray-600 ml-2">
            {isExpanded ? '▼' : '▶'}
          </Text>
        )}
      </TouchableOpacity>
       {section.description && isExpanded && (
        <Text className="px-4 pt-2 text-sm text-gray-600">
          {section.description}
        </Text>
      )}
      {isExpanded && (
        <View className="p-4">
          {fields?.map((field) => {
            if (!checkFieldVisibility(field)) return null;

            return (
              <FormField
                key={field.fieldName}
                field={field}
                value={formData[field.fieldName]}
                error={errors[field.fieldName]}
                isMandatory={isFieldMandatory(field)}
                onChange={(value) => onFieldChange(field.fieldName, value)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
